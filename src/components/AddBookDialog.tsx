import { FC, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useAddBookMutation, useGetBooksQuery } from '../api/bookApi'

const AddBookDialog: FC<{ open: boolean; onClose: () => void}> = ({
  open,
  onClose,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [pages, setPages] = useState('')
  const [status, setStatus] = useState('')
  const [isbn, setIsbn] = useState('')
  const [published, setPublished] = useState('')
  const [addBook] = useAddBookMutation()

  const { refetch: refetchBooks } = useGetBooksQuery()
  const handleAddBook = () => {
    addBook({ title, author, cover, pages, status, isbn, published})
    onClose()
    refetchBooks()
    setTitle('')
    setAuthor('')
    setCover('')
    setTitle('')
    setPages('')
    setStatus('')
    setIsbn('')
    setPublished('')
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <TextField
          label="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <TextField
          label="Cover"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <TextField
          label="Published"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddBook}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBookDialog
