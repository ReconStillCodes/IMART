from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb

#Setting environment

DATA_PATH = r"data"
CHROMA_PATH = r"chroma_db"

chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)

collection = chroma_client.get_or_create_collection(name="imart")

#Loading Document

loader = PyPDFDirectoryLoader(DATA_PATH)

raw_documents = loader.load()

#Splitting the document

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=100,
    length_function=len,
    is_separator_regex=False
)

chunks = text_splitter.split_documents(raw_documents)

documents = []
metadata = []
ids = []

i = 0

for chunk in chunks:
    documents.append(chunk.page_content)
    ids.append("ID" + str(i))
    metadata.append(chunk.metadata)

    i += 1

# Adding to chroma db

collection.upsert(
    documents = documents,
    metadatas= metadata,
    ids = ids
)
