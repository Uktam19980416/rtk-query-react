import Stack from '@mui/joy/Stack'
import Input from '@mui/joy/Input'
import LinearProgress from '@mui/joy/LinearProgress'
import Typography from '@mui/joy/Typography'
import Key from '@mui/icons-material/Key'

export default function PasswordMeterInput({password, setPassword}: {password: string, setPassword: React.Dispatch<React.SetStateAction<string>>}) {
  const minLength = 12
  return (
    <Stack
      spacing={0.5}
      sx={{
        '--hue': Math.min(password.length * 10, 120),
      }}
    >
      <Input
        type="password"
        placeholder="Type in here…"
        startDecorator={<Key />}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <LinearProgress
        determinate
        size="sm"
        value={Math.min((password.length * 100) / minLength, 100)}
        sx={{
          bgcolor: 'background.level3',
          color: 'hsl(var(--hue) 80% 40%)',
        }}
      />
      <Typography
        level="body-xs"
        sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
      >
        {password.length < 3 && 'Very weak'}
        {password.length >= 3 && password.length < 6 && 'Weak'}
        {password.length >= 6 && password.length < 10 && 'Strong'}
        {password.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
  )
}
