import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Moon, Sun } from 'tabler-icons-react'

export const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
    >
      {colorScheme === 'dark' ? <Sun width={18} height={18} /> : <Moon width={20} height={20} />}
    </ActionIcon>
  )
}
