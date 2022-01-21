import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#d2d2d2',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.id;
    if (Number(value) === 0) {
      router.push('/home');
      return;
    }
    router.push(`/home?group_id=${value}`);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAnchor = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const options: any = [
    {
      marginTop: 0,
      bg: '#f8f9fa',
      label: 'Todos',
      groupId: 0,
    },
    {
      marginTop: 1,
      bg: '#ED8936',
      label: 'Auto Peças',
      groupId: 1,
    },
    {
      marginTop: 1,
      bg: '#48BB78',
      label: 'Moto Peças',
      groupId: 2,
    },
    {
      marginTop: 1,
      bg: '#E53E3E',
      label: 'Bicicletas',
      groupId: 3,
    },
    {
      marginTop: 1,
      bg: '#F6E05E',
      label: 'Ferramentas',
      groupId: 4,
    },
    {
      marginTop: 1,
      bg: '#4299E1',
      label: 'Livraria',
      groupId: 5,
    },
    {
      marginTop: 1,
      bg: '#B7791F',
      label: 'Papelaria',
      groupId: 6,
    },
  ];

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleAnchor}
      >
        <MenuIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option: any) => (
          <StyledMenuItem
            style={{ background: option.bg, color: '#000' }}
            id={option.groupId}
            key={option.groupId}
            onClick={handleClick}
          >
            <ListItemText style={{ color: '#000' }} primary={option.label} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
