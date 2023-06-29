export const POSITIONS = {
  pitcher: {
    name: 'pitcher',
    abbrev: 'P',
  },
  catcher: {
    name: 'catcher',
    abbrev: 'C',
  },
  first_base: {
    name: 'first base',
    abbrev: '1B',
  },
  second_base: {
    name: 'second base',
    abbrev: '2B',
  },
  third_base: {
    name: 'third base',
    abbrev: '3B',
  },
  shortstop: {
    name: 'shortstop',
    abbrev: 'SS',
  },
  left_field: {
    name: 'left field',
    abbrev: 'LF',
  },
  center_field: {
    name: 'center field',
    abbrev: 'CF',
  },
  right_field: {
    name: 'right field',
    abbrev: 'RF',
  },
  designated_hitter: {
    name: 'designated hitter',
    abbrev: 'DH',
  }
} as const

export type Position_Key = keyof typeof POSITIONS

export type Position = typeof POSITIONS[keyof typeof POSITIONS]
