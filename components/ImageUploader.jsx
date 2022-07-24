import React, { useState } from 'react';
import { Flex, useClipboard } from '@chakra-ui/react';
import { createUserUploadRef, getFileUrl } from '@lib/storage';
import { useAuth } from '@lib/auth';
import { uploadBytesResumable } from 'firebase/storage';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const { hasCopied, onCopy } = useClipboard(`![alt](${downloadURL})`);
  const auth = useAuth();

  const uploadFile = async e => {
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[0];

    const ref = createUserUploadRef(auth.user.uid, extension);

    setUploading(true);

    const uploadTask = uploadBytesResumable(ref, file);
    uploadTask.on('state_changed', snapshot => {
      const uploadProgess = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(uploadProgess);

      uploadTask
        .then(({ ref }) => getFileUrl(ref))
        .then(url => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };
  return (
    <div>
      {uploading && <Progress value={progress} isIndeterminate size='sm' />}
      {!uploading && (
        <>
          <Button colorScheme='teal' mb={4}>
            <FormLabel htmlFor='image-upload' p={0} m={0}>
              Upload Image
            </FormLabel>
          </Button>
          <Input
            id='image-upload'
            type='file'
            onChange={uploadFile}
            display='none'
            accept='image/x-png,image/gif,image/jpeg'
          />
        </>
      )}
      {downloadURL && (
        <Flex mb={4}>
          <Input value={`![alt](${downloadURL})`} isReadOnly />
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
          {/* <Code onClick={onCopy}>{`![alt](${downloadURL})`}</Code> */}
        </Flex>
      )}
    </div>
  );
};

export default ImageUploader;
