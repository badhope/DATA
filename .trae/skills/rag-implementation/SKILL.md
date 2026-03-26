---
name: "rag-implementation"
description: "Expert in RAG (Retrieval-Augmented Generation) implementation including vector databases, embeddings, and retrieval strategies."
category: "ai-ml"
tags: ["rag", "vector", "embeddings", "retrieval"]
---

# RAG Implementation

Expert in implementing Retrieval-Augmented Generation systems for enhanced LLM capabilities.

## Description

Build production-ready RAG systems that combine the power of large language models with external knowledge retrieval. Covers vector databases, embedding strategies, chunking, retrieval optimization, and answer generation.

## When to Use

- Building knowledge-based Q&A systems
- Creating document search and summarization
- Implementing chatbots with domain knowledge
- Developing AI assistants with up-to-date information
- Building semantic search systems

## Core Components

### 1. Document Processing Pipeline

```python
from typing import List
from dataclasses import dataclass

@dataclass
class Document:
    id: str
    content: str
    metadata: dict
    embeddings: List[float] = None

class DocumentProcessor:
    def __init__(self, chunk_size=1000, chunk_overlap=200):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
    
    def process(self, documents: List[Document]) -> List[Document]:
        chunks = []
        for doc in documents:
            doc_chunks = self._chunk_document(doc)
            chunks.extend(doc_chunks)
        return chunks
    
    def _chunk_document(self, doc: Document) -> List[Document]:
        chunks = []
        text = doc.content
        
        # Sliding window chunking
        for i in range(0, len(text), self.chunk_size - self.chunk_overlap):
            chunk_text = text[i:i + self.chunk_size]
            chunks.append(Document(
                id=f"{doc.id}_chunk_{i}",
                content=chunk_text,
                metadata={**doc.metadata, "chunk_index": i}
            ))
        
        return chunks
```

### 2. Embedding Generation

```python
from openai import OpenAI
from typing import List

class EmbeddingGenerator:
    def __init__(self, model="text-embedding-3-small"):
        self.client = OpenAI()
        self.model = model
    
    def generate(self, texts: List[str]) -> List[List[float]]:
        response = self.client.embeddings.create(
            model=self.model,
            input=texts
        )
        return [item.embedding for item in response.data]
    
    def generate_single(self, text: str) -> List[float]:
        return self.generate([text])[0]
```

### 3. Vector Database Integration

```python
from pinecone import Pinecone
from typing import List, Optional

class VectorStore:
    def __init__(self, api_key: str, index_name: str):
        self.pc = Pinecone(api_key=api_key)
        self.index = self.pc.Index(index_name)
    
    def upsert(self, documents: List[Document]):
        vectors = [
            (doc.id, doc.embeddings, doc.metadata)
            for doc in documents
        ]
        self.index.upsert(vectors)
    
    def query(
        self, 
        query_embedding: List[float], 
        k: int = 5,
        filter: Optional[dict] = None
    ) -> List[dict]:
        results = self.index.query(
            vector=query_embedding,
            top_k=k,
            include_metadata=True,
            filter=filter
        )
        return results.matches
    
    def delete(self, ids: List[str]):
        self.index.delete(ids=ids)
```

### 4. Retrieval Strategies

#### Semantic Search

```python
class SemanticRetriever:
    def __init__(self, vector_store: VectorStore, embedding_generator: EmbeddingGenerator):
        self.store = vector_store
        self.embedder = embedding_generator
    
    def retrieve(self, query: str, k: int = 5) -> List[dict]:
        query_embedding = self.embedder.generate_single(query)
        return self.store.query(query_embedding, k=k)
```

#### Hybrid Search (Semantic + Keyword)

```python
from rank_bm25 import BM25Okapi

class HybridRetriever:
    def __init__(self, vector_store, embedding_generator, documents):
        self.semantic_retriever = SemanticRetriever(vector_store, embedding_generator)
        self.bm25 = BM25Okapi([doc.content.split() for doc in documents])
        self.documents = documents
    
    def retrieve(self, query: str, k: int = 5, alpha: float = 0.5) -> List[dict]:
        # Semantic search
        semantic_results = self.semantic_retriever.retrieve(query, k=k*2)
        
        # Keyword search
        keyword_scores = self.bm25.get_scores(query.split())
        keyword_results = [
            {"doc": self.documents[i], "score": score}
            for i, score in enumerate(keyword_scores)
        ]
        keyword_results.sort(key=lambda x: x["score"], reverse=True)
        
        # Combine results
        return self._combine_results(semantic_results, keyword_results, alpha, k)
    
    def _combine_results(self, semantic, keyword, alpha, k):
        combined = {}
        
        for result in semantic:
            doc_id = result.id
            combined[doc_id] = combined.get(doc_id, 0) + alpha * result.score
        
        for result in keyword[:k*2]:
            doc_id = result["doc"].id
            combined[doc_id] = combined.get(doc_id, 0) + (1-alpha) * result["score"]
        
        return sorted(combined.items(), key=lambda x: x[1], reverse=True)[:k]
```

#### Multi-Query Retrieval

```python
class MultiQueryRetriever:
    def __init__(self, llm, base_retriever):
        self.llm = llm
        self.base_retriever = base_retriever
    
    def retrieve(self, query: str, k: int = 5) -> List[dict]:
        # Generate multiple query variations
        variations = self._generate_variations(query)
        
        # Retrieve for each variation
        all_results = []
        for variation in variations:
            results = self.base_retriever.retrieve(variation, k=k)
            all_results.extend(results)
        
        # Deduplicate and rank
        return self._deduplicate_and_rank(all_results, k)
    
    def _generate_variations(self, query: str) -> List[str]:
        prompt = f"""
        Generate 3 different versions of this query to improve search results:
        
        Original query: {query}
        
        Output one query per line.
        """
        response = self.llm.generate(prompt)
        return [query] + response.strip().split('\n')
```

### 5. Reranking

```python
from sentence_transformers import CrossEncoder

class Reranker:
    def __init__(self, model="cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.model = CrossEncoder(model)
    
    def rerank(self, query: str, documents: List[dict], k: int = 5) -> List[dict]:
        pairs = [(query, doc["content"]) for doc in documents]
        scores = self.model.predict(pairs)
        
        # Sort by score
        ranked = sorted(
            zip(documents, scores),
            key=lambda x: x[1],
            reverse=True
        )
        
        return [{"doc": doc, "rerank_score": score} for doc, score in ranked[:k]]
```

### 6. Answer Generation

```python
class RAGPipeline:
    def __init__(
        self,
        retriever,
        llm,
        reranker=None,
        max_context_tokens=4000
    ):
        self.retriever = retriever
        self.llm = llm
        self.reranker = reranker
        self.max_context_tokens = max_context_tokens
    
    def query(self, question: str, k: int = 5) -> dict:
        # Retrieve relevant documents
        documents = self.retriever.retrieve(question, k=k*2)
        
        # Rerank if available
        if self.reranker:
            documents = self.reranker.rerank(question, documents, k=k)
        
        # Build context
        context = self._build_context(documents[:k])
        
        # Generate answer
        answer = self._generate_answer(question, context)
        
        return {
            "answer": answer,
            "sources": documents[:k],
            "context_used": context
        }
    
    def _build_context(self, documents: List[dict]) -> str:
        context_parts = []
        current_tokens = 0
        
        for doc in documents:
            content = doc.get("content", doc.get("doc", {}).get("content", ""))
            tokens = len(content.split())  # Simplified token count
            
            if current_tokens + tokens > self.max_context_tokens:
                break
            
            context_parts.append(f"[Document {doc.get('id', 'unknown')}]\n{content}")
            current_tokens += tokens
        
        return "\n\n".join(context_parts)
    
    def _generate_answer(self, question: str, context: str) -> str:
        prompt = f"""
        Answer the question based on the provided context.
        If the context doesn't contain enough information, say so.
        
        Context:
        {context}
        
        Question: {question}
        
        Answer:
        """
        return self.llm.generate(prompt)
```

## Advanced Techniques

### 1. Chunking Strategies

```python
class SmartChunker:
    def __init__(self, strategy="semantic"):
        self.strategy = strategy
    
    def chunk(self, document: Document) -> List[Document]:
        if self.strategy == "semantic":
            return self._semantic_chunk(document)
        elif self.strategy == "recursive":
            return self._recursive_chunk(document)
        elif self.strategy == "fixed":
            return self._fixed_chunk(document)
    
    def _semantic_chunk(self, document: Document) -> List[Document]:
        # Use sentence embeddings to find semantic boundaries
        sentences = document.content.split('. ')
        embeddings = self.embedder.generate(sentences)
        
        # Find breakpoints where similarity drops
        chunks = []
        current_chunk = [sentences[0]]
        
        for i in range(1, len(sentences)):
            similarity = cosine_similarity(embeddings[i-1], embeddings[i])
            
            if similarity < 0.5:  # Threshold
                chunks.append(self._create_chunk(current_chunk, document))
                current_chunk = [sentences[i]]
            else:
                current_chunk.append(sentences[i])
        
        if current_chunk:
            chunks.append(self._create_chunk(current_chunk, document))
        
        return chunks
```

### 2. Query Expansion

```python
class QueryExpander:
    def __init__(self, llm):
        self.llm = llm
    
    def expand(self, query: str) -> List[str]:
        prompt = f"""
        Original query: {query}
        
        Generate 3 related queries that might help find relevant information:
        1. A more specific version
        2. A broader version
        3. An alternative phrasing
        
        Output one query per line.
        """
        expanded = self.llm.generate(prompt)
        return [query] + expanded.strip().split('\n')
```

### 3. Context Compression

```python
class ContextCompressor:
    def __init__(self, llm, max_tokens=2000):
        self.llm = llm
        self.max_tokens = max_tokens
    
    def compress(self, context: str, query: str) -> str:
        prompt = f"""
        Compress the following context to only include information relevant to the query.
        Keep important details but remove irrelevant content.
        
        Query: {query}
        
        Context:
        {context}
        
        Compressed context (max {self.max_tokens} tokens):
        """
        return self.llm.generate(prompt)
```

## Evaluation Metrics

### Retrieval Quality

```python
def evaluate_retrieval(retriever, test_cases):
    precision_scores = []
    recall_scores = []
    
    for case in test_cases:
        results = retriever.retrieve(case.query, k=10)
        retrieved_ids = {r.id for r in results}
        relevant_ids = set(case.relevant_docs)
        
        precision = len(retrieved_ids & relevant_ids) / len(retrieved_ids)
        recall = len(retrieved_ids & relevant_ids) / len(relevant_ids)
        
        precision_scores.append(precision)
        recall_scores.append(recall)
    
    return {
        "precision@10": np.mean(precision_scores),
        "recall@10": np.mean(recall_scores)
    }
```

### Answer Quality

```python
def evaluate_answers(rag_pipeline, test_cases):
    scores = []
    
    for case in test_cases:
        result = rag_pipeline.query(case.question)
        score = evaluate_answer_quality(result["answer"], case.expected_answer)
        scores.append(score)
    
    return np.mean(scores)
```

## Best Practices

1. **Chunk Size**: Balance between context and granularity (500-1500 tokens)
2. **Overlap**: Use 10-20% overlap to maintain context
3. **Metadata**: Include source, timestamp, and relevance info
4. **Reranking**: Use for final result quality improvement
5. **Caching**: Cache embeddings for frequently accessed documents
6. **Monitoring**: Track retrieval and generation quality
7. **Updates**: Implement efficient document update strategies
8. **Fallbacks**: Handle cases where retrieval fails

## Vector Database Options

| Database | Pros | Cons |
|----------|------|------|
| Pinecone | Managed, scalable | Cost, vendor lock-in |
| Weaviate | Open source, hybrid search | Self-hosted complexity |
| Milvus | High performance, scalable | Complex setup |
| Qdrant | Rust-based, fast | Smaller community |
| Chroma | Simple, embedded | Limited scale |

## Related Skills

- `ai-agent-design` - AI agent architecture
- `prompt-engineering` - Prompt optimization
- `sql-optimization` - Database optimization
- `mcp-database-integration` - Database integration
