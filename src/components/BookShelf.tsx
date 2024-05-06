import { FC, useState } from 'react';
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from '../api/bookApi';
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material'
import AddBookDialog from './AddBookDialog';
import UpdateBookDialog from './UpdateBookDialog';
import { Book } from '../types';

const Bookshelf: FC = () => {
  const {
    data: books = [],
    error: bookError,
    isLoading: bookLoading,
    refetch: refetchBooks,
  } = useGetBooksQuery()
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [deleteBook] = useDeleteBookMutation()

  const handleDeleteBook = (id: number) => {
    deleteBook(id)
    refetchBooks()
  }

  if (bookLoading) return <div>Loading...</div>
  if (bookError) return <div>Error: Fetching</div>

  return (
    <div>
      <h2>Books</h2>
      <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Pages</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Cover</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Modifiers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.pages}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>
                  <img
                    src={book.cover}
                    alt={book.title}
                    style={{ width: '50px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell>{book.published}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedBook(book)
                      setOpenUpdateDialog(true)
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBookDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
      {selectedBook && (
        <UpdateBookDialog
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
          book={selectedBook}
        />
      )}
    </div>
  )
}

export default Bookshelf
