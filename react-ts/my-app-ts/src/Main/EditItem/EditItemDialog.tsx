// EditItemDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Categories from '../../Const/Categories';
import Chapters from '../../Const/Chapters';

interface EditItemDialogProps {
  editDialogOpen: boolean;
  handleEditDialogClose: () => void;
  editingItem: any | null;
  handleTitleChange: (newTitle: string) => void;
  handleContentChange: (newContent: string) => void;
  handleCategoryChange: (newCategory: string) => void;
  handleChapterChange: (newChapter: string) => void;
  handleSaveChanges: () => void;
}

const EditItemDialog: React.FC<EditItemDialogProps> = ({
  editDialogOpen,
  handleEditDialogClose,
  editingItem,
  handleTitleChange,
  handleContentChange,
  handleCategoryChange,
  handleChapterChange,
  handleSaveChanges,
}) => {
  return (
    <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
      <DialogTitle>アイテムの編集</DialogTitle>
      <DialogContent>
        <TextField
          label="タイトル"
          fullWidth
          value={editingItem?.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="内容"
          fullWidth
          multiline
          rows={4}
          value={editingItem?.content}
          onChange={(e) => handleContentChange(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <FormControl style={{ width: '100%', marginBottom: '16px' }}>
          <InputLabel>カテゴリ</InputLabel>
          <Select
            value={editingItem?.category}
            onChange={(e) => handleCategoryChange(e.target.value as string)}
          >
            {Categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <InputLabel>章</InputLabel>
          <Select
            value={editingItem?.chapter}
            onChange={(e) => handleChapterChange(e.target.value as string)}
          >
            {Chapters.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditDialogClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;