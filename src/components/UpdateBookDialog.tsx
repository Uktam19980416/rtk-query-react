import { FC, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useGetBooksQuery, useUpdateBookMutation } from '../api/bookApi'
import { Book } from '../types'

const UpdateBookDialog: FC<{
  open: boolean
  onClose: () => void
  book: Book
}> = ({ open, onClose, book }) => {
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [cover, setCover] = useState(book.cover)
  const [pages, setPages] = useState(book.pages)
  const [status, setStatus] = useState(book.status)
  const [isbn, setIsbn] = useState(book.isbn)
  const [published, setPublished] = useState(book.published)
  const [updateBook] = useUpdateBookMutation()

  const { refetch: refetchBooks } = useGetBooksQuery()
  const handleUpdateBook = () => {
    updateBook({ id: book.id, title, author, cover, pages, status, isbn, published })
    onClose()
    refetchBooks()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Book</DialogTitle>
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
        <Button onClick={handleUpdateBook}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateBookDialog

