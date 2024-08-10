import { Injectable } from '@nestjs/common';

@Injectable()
export class ChineseHoroscopeService {
  getHoroscopeByBirthdate(birthdate: Date): string {
    const year = birthdate.getUTCFullYear();
    const zodiacSign = getChineseZodiac(year);
    return zodiacSign;
  }
}

function getChineseZodiac(year: number): string {
  const zodiacAnimals = [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig',
  ];

  return zodiacAnimals[year % 12];
}

function getChineseHoroscope(zodiacSign: string): string {
  const horoscopes = {
    Rat: 'Today is a good day for financial decisions. Be cautious with investments.',
    Ox: 'Your hard work will pay off today. Stay focused and determined.',
    Tiger: 'You will face challenges head-on. Trust your instincts.',
    Rabbit: 'Today is a great day for socializing. Reach out to friends.',
    Dragon: 'Your creativity will shine today. Embrace new ideas.',
    Snake: 'Stay calm in stressful situations. Your wisdom will guide you.',
    Horse: 'Adventure awaits! Be open to new experiences.',
    Goat: 'You may need to be more assertive today. Speak your mind.',
    Monkey: 'Your wit and charm will win others over today.',
    Rooster: 'Today is a great day for planning and organization.',
    Dog: 'Trust your intuition today. It will lead you to success.',
    Pig: 'Enjoy the simple pleasures in life. Treat yourself today.',
  };

  return (
    horoscopes[zodiacSign] ||
    'Your future is unclear. Be prepared for anything.'
  );
}
