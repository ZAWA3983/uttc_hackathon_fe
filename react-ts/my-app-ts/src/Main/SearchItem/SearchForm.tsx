// SearchForm.tsx
import React from 'react';
import { Paper, InputBase, FormControl, Select, MenuItem, Box, Button, Container } from '@mui/material';
import useCategories from '../../Const/useCategories';
import useChapters from '../../Const/useChapters';

interface SearchFormProps {
  searchTerm: string;
  selectedCategory: string;
  selectedChapter: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedChapter: (chapter: string) => void;
  handleSearchButtonClick: () => void;
  sortOption: string; // 新しく追加
  setSortOption: (option: string) => void; // 新しく追加
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  selectedCategory,
  selectedChapter,
  setSearchTerm,
  setSelectedCategory,
  setSelectedChapter,
  handleSearchButtonClick,
  sortOption, // 新しく追加
  setSortOption, // 新しく追加
}) => {
  const chaptersOptions = useChapters();
  const categoriesOptions = useCategories();
  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Paper component="form" style={{ padding: '8px', textAlign: 'center', width: '100%' }}>
        <InputBase
          placeholder="検索"
          inputProps={{ 'aria-label': 'search' }}
          style={{ width: '200%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
        <FormControl variant="outlined" style={{ minWidth: 150, height: '50%' }}>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <MenuItem value="">選択してください</MenuItem>
            {categoriesOptions.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 150, height: '50%', marginLeft: '8px' }}>
          <Select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value as string)}
          >
            <MenuItem value="">選択してください</MenuItem>
            {chaptersOptions.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" style={{ width: '25%' }} onClick={handleSearchButtonClick}>
          検索
        </Button>
      </Box>
      
      {/* 新しい select 要素を追加 */}
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="createdAt">新着投稿順</option>
            <option value="-createdAt">投稿日が古い順</option>
            <option value="updatedAt">新着更新順</option>
            <option value="-updatedAt">更新日が古い順</option>
          </select>
        </div>
      </Box>
    </Container>
  );
};

export default SearchForm;