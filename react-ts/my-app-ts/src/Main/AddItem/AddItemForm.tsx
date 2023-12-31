
// AddItemForm.tsx
import React, { useState } from 'react';
import { Container } from '@mui/material';
import ItemForm from './ItemForm';
import { fireAuth } from '../../Auth/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AddItemFormProps {
  onFormSubmitSuccess: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onFormSubmitSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (selectedFile: File | null, fileType: string | null) => {
    setFile(selectedFile);
    setFileType(fileType);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = fireAuth.currentUser;

    if (user) {
      const userEmail = user.email;

      if (!title || !category || !chapter) {
        setErrorMessage('フィールドを埋めてください');
        return; // 送信を中止
      }

      const storage = getStorage();
      const storageRef = ref(storage, 'files');

      if (file) {
        const fileRef = ref(storageRef, file.name);

        try {
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);

          const data = {
            title,
            content,
            category,
            chapter,
            file: url,
            fileType,
            createdBy: userEmail,
            createdByName: userEmail,
          };

          const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/addItem', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('データが送信されました:', responseData);
            onFormSubmitSuccess();
          } else {
            setErrorMessage('データの送信に失敗しました');
            console.error('エラー:', response.statusText);
          }
        } catch (error) {
          setErrorMessage('エラーが発生しました');
          console.error('エラー:', error);
        }
      } else {
        // ファイルが選択されていない場合の処理
        const data = {
          title,
          content,
          category,
          chapter,
          fileType,
          createdBy: userEmail,
          createdByName: userEmail,
        };

        const response = await fetch('https://uttc-hackathon-be-agfjgti4cq-uc.a.run.app/api/addItem', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('データが送信されました:', responseData);
          onFormSubmitSuccess();
        } else {
          setErrorMessage('データの送信に失敗しました');
          console.error('エラー:', response.statusText);
        }
      }
    } else {
      setErrorMessage('ユーザーがサインインしていません');
      console.error('ユーザーがサインインしていません');
    }
  };

  return (
    <Container>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <ItemForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        chapter={chapter}
        setChapter={setChapter}
        file={file}
        onFileChange={handleFileChange}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default AddItemForm;

