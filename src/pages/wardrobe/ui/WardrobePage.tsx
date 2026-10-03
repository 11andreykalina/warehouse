import { Stack } from '@mui/material';

import { WardrobeOverview } from '@/widgets/wardrobe-overview';
import { PageStack, SectionHeading } from '@/shared/ui';

export function WardrobePage() {
  return (
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="Выданное имущество" title="Мой гардероб" />
        <WardrobeOverview />
      </Stack>
    </PageStack>
  );
}
