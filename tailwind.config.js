module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/**/**/*.{js,jsx}", "./src/**/**/**/*.{js,jsx}"],
  theme: {
    screens: {
      'xl': { 'max': '1600px' },
      'xlg': { 'max': '1400px' },
      'lg': { 'max': '1199px' },
      'md': { 'max': '991px' },
      'sm': { 'max': '767px' },
      'xs': { 'max': '575px' },
      'xxs': { 'max': '480px' },
      'mxl': { 'raw': '(min-width: 1921px)' },
    },
    fontSize: {
      base: ['12px', '28px'],
      xxs: ['8px', '12px'],
      xs: ['10px', '14px'],
      sm: ['10px', '20px'],
      md: ['11px', '18px'],
      xmd: ['14px', '24px'],
      lg: ['10px', '18px'],
      xxmd: ['14px', '24px'],
      xlg: ['18px', '24px'],
      big: ['22px', '28px'],
      tit: ['28px', '34px'],
      xxlg: ['30px', '38px'],
      xbig: ['40px', '48px'],
      xbig: ['180px', '200px']
    },
    extend: {
      textUnderlineOffset: {
        2: '3px',
        4: '4px',
        8: '8px'
      },
      colors: {
        fastblue: '#BF0D19',
        darkgray: '#232323',
        darkslateblue: '#1f232c',
        lightgray: '#f7f7f7',
        spanishgray: '#939393',
        mediumgray: '#e4e4e4',
        darkpurple2: '#241526',
        coolgray: '#d6d5d5',
        neonorange: '#ff7a56',
        slateblue: '#8890a4',
        red: "#BF0D19",
        error: 'red',
        balck: "balck",
        temp: "#C39B4E",
        gray: "#828282"
      }
    },
  },
  corePlugin: {
    order: false
  },
  plugins: [],
}