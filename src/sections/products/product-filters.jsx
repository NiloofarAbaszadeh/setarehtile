import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from '../../Components/iconify';
import Scrollbar from '../../Components/scrollbar';
import { ColorPicker } from '../../Components/color-utils';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'پرکاربردترین', label: 'پرکاربردترین' },
  { value: 'جدید ترین', label: 'جدید ترین' },
  { value: 'گران ترین', label: 'گران ترین' },
  { value: 'ارزان ترین', label: 'ارزان ترین' },
];
export const GENDER_OPTIONS = ['مردانه', 'زنانه', 'بچه گانه'];
export const CATEGORY_OPTIONS = ['همه', 'خارجی', 'داخلی', 'اسلب'];
export const RATING_OPTIONS = ['4 ستاره', '3 ستاره', '2 ستاره', '1 ستاره'];
export const PRICE_OPTIONS = [
  { value: 'below', label: 'زیر 25 دلار' },
  { value: 'between', label: 'بین 25 تا 75 دلار' },
  { value: 'above', label: 'بالای 75 دلار' },
];
export const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export default function ProductFilters({ openFilter, onOpenFilter, onCloseFilter }) {
  const renderGender = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">جنسیت</Typography>
      <FormGroup>
        {GENDER_OPTIONS.map((item) => (
          <FormControlLabel key={item} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">کتگوری</Typography>
      <RadioGroup>
        {CATEGORY_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderColors = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">رنگ</Typography>
      <ColorPicker
        name="colors"
        selected={[]}
        colors={COLOR_OPTIONS}
        onSelectColor={(color) => [].includes(color)}
        sx={{ maxWidth: 38 * 4 }}
      />
    </Stack>
  );

  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">قیمت</Typography>
      <RadioGroup>
        {PRICE_OPTIONS.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderRating = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">امتیاز</Typography>
      <RadioGroup>
        {RATING_OPTIONS.map((item, index) => (
          <FormControlLabel
            key={item}
            value={item}
            control={
              <Radio
                disableRipple
                color="default"
                icon={<Rating readOnly value={4 - index} />}
                checkedIcon={<Rating readOnly value={4 - index} />}
                sx={{
                  '&:hover': { bgcolor: 'transparent' },
                }}
              />
            }
            label="& Up"
            sx={{
              my: 0.5,
              borderRadius: 1,
              '&:hover': { opacity: 0.48 },
            }}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        فیلتر ها &nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            فیلتر ها
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderGender}

            {renderCategory}

            {renderColors}

            {renderPrice}

            {renderRating}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            حذف همه
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
