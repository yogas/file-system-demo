// https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/

const btnCreate = document.getElementById('btn-create');
const btnWrite = document.getElementById('btn-write');
const btnRead = document.getElementById('btn-read');
const btnDelete = document.getElementById('btn-delete');

const fileName = document.getElementById('file-name');
const content = document.getElementById('content');

const getFile = async (name, options={}) => {
  const rootDir = await navigator.storage.getDirectory();
  return await rootDir.getFileHandle(name, options);
}

const onCreate = async () => {
  const rootDir = await navigator.storage.getDirectory();
  await rootDir.getFileHandle(fileName.value, {create: true});
  console.log(fileName.value, 'created')
}

const onWrite = async () => {
  const file = await getFile(fileName.value);
  const writable = await file.createWritable();
  await writable.write(content.value);
  await writable.close();
  console.log('content written to file', fileName.value);
}

const onRead = async () => {
  const fileHandle =  await getFile(fileName.value);
  const file = await fileHandle.getFile();
  const buffer = await file.arrayBuffer();
  const decoder = new TextDecoder();
  console.log(decoder.decode(buffer))
}

const onDelete = async () => {
  const rootDir = await navigator.storage.getDirectory();
  await rootDir.removeEntry(fileName.value);
  console.log(fileName.value, 'deleted')
}

btnCreate.addEventListener('click', onCreate)
btnWrite.addEventListener('click', onWrite)
btnRead.addEventListener('click', onRead)
btnDelete.addEventListener('click', onDelete)