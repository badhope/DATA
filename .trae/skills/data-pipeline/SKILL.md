---
name: "data-pipeline"
description: "Expert in data pipeline construction including ETL, data cleaning, transformation, and orchestration."
category: "data"
tags: ["data", "etl", "pipeline", "orchestration"]
---

# Data Pipeline

Expert in building robust data pipelines for ETL, transformation, and orchestration.

## Description

Design and implement scalable data pipelines that extract, transform, and load data efficiently. Covers data cleaning, transformation patterns, orchestration tools, and monitoring.

## When to Use

- Building ETL/ELT pipelines
- Data warehouse integration
- Real-time data processing
- Data migration projects
- Building data lakes

## Core Components

### 1. ETL Pipeline Framework

```python
from abc import ABC, abstractmethod
from typing import Any, Dict, List
from dataclasses import dataclass
from datetime import datetime

@dataclass
class PipelineContext:
    run_id: str
    timestamp: datetime
    config: Dict[str, Any]
    metrics: Dict[str, float]

class PipelineStep(ABC):
    @abstractmethod
    def execute(self, data: Any, context: PipelineContext) -> Any:
        pass
    
    @abstractmethod
    def validate(self, data: Any) -> bool:
        pass

class ETLPipeline:
    def __init__(self, name: str):
        self.name = name
        self.steps: List[PipelineStep] = []
        self.context = PipelineContext(
            run_id=str(uuid.uuid4()),
            timestamp=datetime.now(),
            config={},
            metrics={}
        )
    
    def add_step(self, step: PipelineStep) -> 'ETLPipeline':
        self.steps.append(step)
        return self
    
    def execute(self, initial_data: Any = None) -> Any:
        data = initial_data
        for step in self.steps:
            if not step.validate(data):
                raise ValueError(f"Validation failed for step: {step.__class__.__name__}")
            data = step.execute(data, self.context)
        return data
```

### 2. Extractors

```python
class DataExtractor(ABC):
    @abstractmethod
    def extract(self) -> Any:
        pass

class DatabaseExtractor(DataExtractor):
    def __init__(self, connection_string: str, query: str):
        self.connection_string = connection_string
        self.query = query
    
    def extract(self) -> List[Dict]:
        import pandas as pd
        df = pd.read_sql(self.query, self.connection_string)
        return df.to_dict('records')

class APIExtractor(DataExtractor):
    def __init__(self, url: str, headers: Dict = None, params: Dict = None):
        self.url = url
        self.headers = headers or {}
        self.params = params or {}
    
    def extract(self) -> Dict:
        import requests
        response = requests.get(self.url, headers=self.headers, params=self.params)
        response.raise_for_status()
        return response.json()

class FileExtractor(DataExtractor):
    def __init__(self, file_path: str, file_type: str = 'csv'):
        self.file_path = file_path
        self.file_type = file_type
    
    def extract(self) -> Any:
        import pandas as pd
        if self.file_type == 'csv':
            return pd.read_csv(self.file_path)
        elif self.file_type == 'parquet':
            return pd.read_parquet(self.file_path)
        elif self.file_type == 'json':
            return pd.read_json(self.file_path)
        else:
            raise ValueError(f"Unsupported file type: {self.file_type}")
```

### 3. Transformers

```python
class DataTransformer(ABC):
    @abstractmethod
    def transform(self, data: Any) -> Any:
        pass

class CleaningTransformer(DataTransformer):
    def __init__(self, rules: Dict[str, Any]):
        self.rules = rules
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        # Remove duplicates
        if self.rules.get('remove_duplicates'):
            df = df.drop_duplicates()
        
        # Handle missing values
        for column, strategy in self.rules.get('missing_values', {}).items():
            if strategy == 'drop':
                df = df.dropna(subset=[column])
            elif strategy == 'mean':
                df[column] = df[column].fillna(df[column].mean())
            elif strategy == 'median':
                df[column] = df[column].fillna(df[column].median())
            elif isinstance(strategy, (str, int, float)):
                df[column] = df[column].fillna(strategy)
        
        # Remove outliers
        if self.rules.get('remove_outliers'):
            for column in self.rules['remove_outliers']:
                Q1 = df[column].quantile(0.25)
                Q3 = df[column].quantile(0.75)
                IQR = Q3 - Q1
                df = df[~((df[column] < (Q1 - 1.5 * IQR)) | 
                          (df[column] > (Q3 + 1.5 * IQR)))]
        
        return df

class SchemaTransformer(DataTransformer):
    def __init__(self, schema: Dict[str, str]):
        self.schema = schema
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        for column, dtype in self.schema.items():
            if column in df.columns:
                df[column] = df[column].astype(dtype)
        return df

class AggregationTransformer(DataTransformer):
    def __init__(self, group_by: List[str], aggregations: Dict[str, List[str]]):
        self.group_by = group_by
        self.aggregations = aggregations
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return df.groupby(self.group_by).agg(self.aggregations).reset_index()

class JoinTransformer(DataTransformer):
    def __init__(self, right_df: pd.DataFrame, on: str, how: str = 'inner'):
        self.right_df = right_df
        self.on = on
        self.how = how
    
    def transform(self, left_df: pd.DataFrame) -> pd.DataFrame:
        return left_df.merge(self.right_df, on=self.on, how=self.how)
```

### 4. Loaders

```python
class DataLoader(ABC):
    @abstractmethod
    def load(self, data: Any) -> bool:
        pass

class DatabaseLoader(DataLoader):
    def __init__(self, connection_string: str, table: str, if_exists: str = 'append'):
        self.connection_string = connection_string
        self.table = table
        self.if_exists = if_exists
    
    def load(self, df: pd.DataFrame) -> bool:
        df.to_sql(
            self.table,
            self.connection_string,
            if_exists=self.if_exists,
            index=False
        )
        return True

class FileLoader(DataLoader):
    def __init__(self, file_path: str, file_type: str = 'parquet'):
        self.file_path = file_path
        self.file_type = file_type
    
    def load(self, df: pd.DataFrame) -> bool:
        if self.file_type == 'parquet':
            df.to_parquet(self.file_path, index=False)
        elif self.file_type == 'csv':
            df.to_csv(self.file_path, index=False)
        elif self.file_type == 'json':
            df.to_json(self.file_path, orient='records')
        return True

class S3Loader(DataLoader):
    def __init__(self, bucket: str, key: str, aws_credentials: Dict):
        self.bucket = bucket
        self.key = key
        self.aws_credentials = aws_credentials
    
    def load(self, df: pd.DataFrame) -> bool:
        import boto3
        s3 = boto3.client('s3', **self.aws_credentials)
        
        buffer = df.to_parquet(index=False)
        s3.put_object(Bucket=self.bucket, Key=self.key, Body=buffer)
        return True
```

## Orchestration

### 1. Airflow DAG

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'etl_pipeline',
    default_args=default_args,
    schedule_interval='@daily',
    catchup=False
)

def extract_task(**context):
    extractor = DatabaseExtractor(
        connection_string='postgresql://...',
        query='SELECT * FROM source_table WHERE date = {{ ds }}'
    )
    return extractor.extract()

def transform_task(**context):
    data = context['task_instance'].xcom_pull(task_ids='extract')
    transformer = CleaningTransformer({
        'remove_duplicates': True,
        'missing_values': {'column1': 'mean'}
    })
    return transformer.transform(data)

def load_task(**context):
    data = context['task_instance'].xcom_pull(task_ids='transform')
    loader = DatabaseLoader(
        connection_string='postgresql://...',
        table='target_table'
    )
    return loader.load(data)

extract = PythonOperator(task_id='extract', python_callable=extract_task, dag=dag)
transform = PythonOperator(task_id='transform', python_callable=transform_task, dag=dag)
load = PythonOperator(task_id='load', python_callable=load_task, dag=dag)

extract >> transform >> load
```

### 2. Prefect Flow

```python
from prefect import flow, task
from prefect.task_runners import ConcurrentTaskRunner

@task(retries=3, retry_delay_seconds=60)
def extract_data():
    extractor = APIExtractor(url='https://api.example.com/data')
    return extractor.extract()

@task
def transform_data(data):
    transformer = CleaningTransformer({'remove_duplicates': True})
    return transformer.transform(data)

@task
def load_data(data):
    loader = DatabaseLoader(connection_string='...', table='target')
    return loader.load(data)

@flow(task_runner=ConcurrentTaskRunner())
def data_pipeline():
    data = extract_data()
    transformed = transform_data(data)
    load_data(transformed)

if __name__ == "__main__":
    data_pipeline()
```

## Data Quality

```python
class DataQualityChecker:
    def __init__(self, rules: Dict[str, Any]):
        self.rules = rules
    
    def check(self, df: pd.DataFrame) -> Dict[str, bool]:
        results = {}
        
        for rule_name, rule in self.rules.items():
            if rule['type'] == 'not_null':
                results[rule_name] = df[rule['column']].notna().all()
            elif rule['type'] == 'unique':
                results[rule_name] = df[rule['column']].is_unique
            elif rule['type'] == 'range':
                results[rule_name] = (
                    (df[rule['column']] >= rule['min']) & 
                    (df[rule['column']] <= rule['max'])
                ).all()
            elif rule['type'] == 'regex':
                results[rule_name] = df[rule['column']].str.match(rule['pattern']).all()
        
        return results
    
    def get_failures(self, df: pd.DataFrame) -> List[str]:
        results = self.check(df)
        return [rule for rule, passed in results.items() if not passed]
```

## Monitoring

```python
class PipelineMonitor:
    def __init__(self, pipeline_name: str):
        self.pipeline_name = pipeline_name
        self.metrics = {}
    
    def record_metric(self, name: str, value: float):
        self.metrics[name] = value
    
    def record_timing(self, step: str, duration: float):
        self.metrics[f"{step}_duration_seconds"] = duration
    
    def record_count(self, step: str, count: int):
        self.metrics[f"{step}_record_count"] = count
    
    def send_to_monitoring(self):
        # Send to Prometheus, CloudWatch, etc.
        pass
```

## Best Practices

1. **Idempotency**: Pipelines should be safely re-runnable
2. **Error Handling**: Graceful failure with clear error messages
3. **Logging**: Comprehensive logging for debugging
4. **Monitoring**: Track pipeline health and performance
5. **Testing**: Unit and integration tests for all components
6. **Documentation**: Document data schemas and transformations
7. **Version Control**: Track pipeline code changes
8. **Data Lineage**: Track data flow and transformations

## Related Skills

- `sql-optimization` - Database optimization
- `database-migration` - Database migrations
- `observability-monitoring` - Pipeline monitoring
- `mcp-database-integration` - Database integration
