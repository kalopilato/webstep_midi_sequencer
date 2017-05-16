export const NOTES = ['C',
                      'C# / Db',
                      'D',
                      'D# / Eb',
                      'E',
                      'F',
                      'F# / Gb',
                      'G',
                      'G# / Ab',
                      'A',
                      'A# / Bb',
                      'B' ]

export const STEP_VALUES = ['1/4',
                            '1/8',
                            '1/16']

export const SCALES = {
  HARMONIC_MINOR:     [0, 2, 3, 5, 7, 8, 11, 12],
  HUNGARIAN_MINOR:    [0, 2, 3, 6, 7, 8, 11, 12],
  MAJOR:              [0, 2, 4, 5, 7, 9, 11, 12],
  DORIAN:             [0, 2, 3, 5, 7, 9, 10, 12],
  UKRANIAN_DORIAN:    [0, 2, 3, 6, 7, 9, 10, 12],
  BEBOP_DORIAN:       [0, 3, 4, 5, 7, 9, 10, 12],
  PHRYGIAN:           [0, 1, 3, 5, 7, 8, 10, 12],
  LYDIAN:             [0, 2, 4, 6, 7, 9, 11, 12],
  MIXOLYDIAN:         [0, 2, 4, 5, 7, 9, 10, 12],
  AEOLIAN:            [0, 2, 3, 5, 7, 8, 10, 12], // descending melodic minor scale
  HEPTATONIA_SECONDA: [0, 2, 3, 5, 7, 9, 11, 12], // ascending melodic minor scale
  LOCRIAN:            [0, 1, 3, 5, 6, 8, 10, 12],
  MARVA:              [0, 1, 4, 6, 7, 9, 11, 12],
  TODI:               [0, 1, 3, 6, 7, 8, 11, 12]
}

// Maps MIDI channel numbers to binary nibbles
export const MIDI_CHANNELS = {
  1:  '0000',
  2:  '0001',
  3:  '0010',
  4:  '0011',
  5:  '0100',
  6:  '0101',
  7:  '0110',
  8:  '0111',
  9:  '1000',
  10: '1001',
  11: '1010',
  12: '1011',
  13: '1100',
  14: '1101',
  15: '1110',
  16: '1111'
}

// Maps MIDI message types to binary nibbles
export const MIDI_MESSAGE_TYPE = {
  NOTE_ON:  '1001',
  NOTE_OFF: '1000'
}

export const TOTAL_STEPS = 16;
export const GRID_COUNT = 4;
