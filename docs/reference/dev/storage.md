---
title: Storage
layout: docs
methods:
  - signature: storage.uploadFile(pathOrRef, file, metadata)
    id: uploadFile
    generator: false
    description: |
      Uploads a file to cloud storage.

      When executed within a `call` effect, redux-saga will "resolve" the returned `UploadTask` into an [`UploadTaskSnapshot`](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTaskSnapshot) and directly return that instead.
      You might want to consider *not* using the `call` effect creator when using this method.

      More information in [issue \#177](https://github.com/n6g7/redux-saga-firebase/issues/177).
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
      - name: file
        required: true
        type: '[Blob](https://developer.mozilla.org/en/docs/Web/API/Blob), [File](https://developer.mozilla.org/en-US/docs/Web/API/File) or [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)'
        description: The file to upload at the specified path.
      - name: metadata
        required: false
        type: '[UploadMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata)'
        description: Metadata to attach to the file.
    output: An [UploadTask](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask) object.
    example: |
      ```js
      function* uploadFile(action) {
        const task = rsf.storage.uploadFile(action.path, action.file);

        const channel = eventChannel(emit => task.on('state_changed', emit));

        yield takeEvery(channel, ...);

        // Wait for upload to complete
        yield task

        // Do something on complete
      }
      ```

  - signature: storage.uploadString(pathOrRef, string, format, metadata)
    id: uploadString
    generator: false
    description: Use this to upload a raw, `base64`, `base64url`, or `data_url` encoded string to Cloud Storage.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
      - name: string
        required: true
        type: String
        description: The content to upload.
      - name: format
        required: false
        type: String
        description: 'Available options are: `base64`, `base64url`, or `data_url`.'
      - name: metadata
        required: false
        type: '[UploadMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata)'
        description: Metadata to attach to the file.
    output: An [UploadTask](https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask) object.
    example: |
      ```js
      function* uploadString(action) {
        const task = yield call(rsf.storage.uploadString, action.path, action.fileData, 'base64');

        const channel = eventChannel(emit => task.on('state_changed', emit));

        yield takeEvery(channel, ...);

        // Wait for upload to complete
        yield task

        // Do something on complete
      }
      ```

  - signature: storage.getDownloadURL(pathOrRef)
    id: getDownloadURL
    generator: true
    description: Returns a download url for the file at the specified path.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
    output: An URL as a string.
    example: |
      ```js
      function* downloadFile(action) {
        const url = yield call(rsf.storage.getDownloadURL, action.path);

        yield call(fetch, url, ...);
      }
      ```

  - signature: storage.getFileMetadata(pathOrRef)
    id: getFileMetadata
    generator: true
    description: Returns the metadata attached to a file.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
    output: A [FullMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.FullMetadata) object.
    example: |
      ```js
      function* metadata(action) {
        const metadata = yield call(rsf.storage.getFileMetadata, action.path);
        return metadata;
      }
      ```

  - signature: storage.updateFileMetadata(pathOrRef, newMetadata)
    id: updateFileMetadata
    generator: true
    description: Updates the metadata for a file.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
      - name: newMetadata
        required: true
        type: A [SettableMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.SettableMetadata) object
        description: The metadata to attach to the file.
    output: A [FullMetadata](https://firebase.google.com/docs/reference/js/firebase.storage.FullMetadata) object.
    example: |
      ```js
      function* setToPng(action) {
        const metadata = yield call(rsf.storage.updateFileMetadata, action.path, {
          contentType: 'image/png'
        });
        return metadata;
      }
      ```

  - signature: storage.deleteFile(pathOrRef)
    id: deleteFile
    generator: true
    description: Deletes a file.
    arguments:
      - name: pathOrRef
        required: true
        type: String or [Firebase Storage Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
        description: The path or reference of the file in the bucket.
    output:
    example: |
      ```js
      function* deleteFile(action) {
        yield call(rsf.storage.deleteFile, action.path);
      }
      ```
---
