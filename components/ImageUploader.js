import React, { useRef, useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../lib/firebase';
import Loader from './Loader';
import { BiCamera } from 'react-icons/bi';
import styled from 'styled-components';

const ImageUploader = () => {
  const FileInput = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleClick = () => {
    FileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  const uploadFile = async (e) => {
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[0];

    // makes reference to storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );

    setUploading(true);

    const task = ref.put(file);

    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      // get downloadURL AFTER task resolves(not native promise)

      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}
      {!uploading && (
        <>
          <UploadButton>
            <BiCamera size={'28'} />
            Upload Image
            <input
              type='file'
              // onChange={uploadFile}
              ref={FileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
              accept='image/x-png,image/gif,image/jpeg'
            />
          </UploadButton>
        </>
      )}
      {downloadURL && <code>{`![alt](${downloadURL})`}</code>}
    </div>
  );
};

export default ImageUploader;

const UploadButton = styled.label`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  /* border-radius: 50px; */
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin: 1em 0;
  transition: 0.3s all;
  padding: 12px 0;
  width: 170px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.darker};
    opacity: 0.8;
  }
`;
