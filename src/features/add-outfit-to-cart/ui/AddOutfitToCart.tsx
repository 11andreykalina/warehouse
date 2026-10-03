import { useState } from 'react';
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { cartItemsAdded } from '@/entities/cart';
import type { Product } from '@/entities/product';
import {
  addOutfitButtonSx,
  outfitDialogListSx,
  outfitDialogProductNameSx,
  outfitDialogRowSx,
  outfitDialogActionsSx,
} from './AddOutfitToCart.styles';

export function AddOutfitToCart({
  outfitName,
  products,
  disabled = false,
}: {
  outfitName: string;
  products: Product[];
  disabled?: boolean;
}) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const hasAllSizes = products.length > 0 && products.every((product) => selectedSizes[product.id]);

  const handleOpen = () => {
    setSelectedSizes({});
    setDialogOpen(true);
  };

  const handleAdd = () => {
    if (!hasAllSizes) return;

    dispatch(
      cartItemsAdded(
        products.map((product) => ({ productId: product.id, size: selectedSizes[product.id] })),
      ),
    );
    setDialogOpen(false);
    setNotificationOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddShoppingCartOutlined />}
        onClick={handleOpen}
        sx={addOutfitButtonSx}
        disabled={disabled || products.length === 0}
      >
        Добавить комплект в заявку
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Размеры комплекта</DialogTitle>
        <DialogContent>
          <Stack sx={outfitDialogListSx}>
            <Typography variant="body2" color="text.secondary">
              Выберите размер для каждой позиции комплекта «{outfitName}».
            </Typography>
            {products.map((product) => (
              <Stack key={product.id} sx={outfitDialogRowSx}>
                <Typography sx={outfitDialogProductNameSx}>{product.name}</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Размер"
                  value={selectedSizes[product.id] ?? ''}
                  disabled={product.availableSizes.length === 0}
                  onChange={(event) => setSelectedSizes((current) => ({ ...current, [product.id]: event.target.value }))}
                >
                  {product.availableSizes.length === 0 ? (
                    <MenuItem value="">Размеры не указаны</MenuItem>
                  ) : (
                    product.availableSizes.map((size) => <MenuItem key={size} value={size}>{size}</MenuItem>)
                  )}
                </TextField>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={outfitDialogActionsSx}>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!hasAllSizes}>
            Добавить позиции
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={notificationOpen} autoHideDuration={4000} onClose={() => setNotificationOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setNotificationOpen(false)}>
          Комплект добавлен в заявку
        </Alert>
      </Snackbar>
    </>
  );
}