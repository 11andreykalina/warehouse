import { mockUser, UserCard } from '@/entities/user';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { PageStack, SectionHeading } from '@/shared/ui';
import { profileActionSx } from './ProfilePage.styles';

export function ProfilePage() {
  return (
    <PageStack>
      <SectionHeading eyebrow="Учётная запись" title="Профиль сотрудника" />
      <UserCard user={mockUser} />
      <Button component={Link} to="/login" variant="outlined" sx={profileActionSx}>
        Открыть демо-вход
      </Button>
    </PageStack>
  );
}
