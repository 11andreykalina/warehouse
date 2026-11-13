import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';

import type { Product } from '@/entities/product';
import { useAddOutfitToCart } from '../model/useAddOutfitToCart';
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
  const {
    dialogOpen,
    selectedSizes,
    notificationOpen,
    hasAllSizes,
    isButtonDisabled,
    handleOpen,
    handleSizeChange,
    handleAdd,
    handleCloseDialog,
    handleCloseNotification,
  } = useAddOutfitToCart(products, disabled);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddShoppingCartOutlined />}
        onClick={handleOpen}
        sx={addOutfitButtonSx}
        disabled={isButtonDisabled}
      >
        Добавить комплект в заявку
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
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
                  onChange={(event) => handleSizeChange(product.id, event.target.value)}
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
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!hasAllSizes}>
            Добавить позиции
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={notificationOpen} autoHideDuration={4000} onClose={handleCloseNotification}>
        <Alert severity="success" variant="filled" onClose={handleCloseNotification}>
          Комплект добавлен в заявку
        </Alert>
      </Snackbar>
    </>
  );
}