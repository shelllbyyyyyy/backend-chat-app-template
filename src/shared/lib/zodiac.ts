import { Injectable } from '@nestjs/common';

@Injectable()
export class ZodiacService {
  getHoroscopeByBirthdate(birthdate: Date): string {
    const zodiacSign = getZodiacSign(birthdate);
    return zodiacSign;
  }
}

function getZodiacSign(date: Date): string {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  switch (month) {
    case 1:
      return day >= 20 ? 'Aquarius' : 'Capricorn';
    case 2:
      return day >= 19 ? 'Pisces' : 'Aquarius';
    case 3:
      return day >= 21 ? 'Aries' : 'Pisces';
    case 4:
      return day >= 20 ? 'Taurus' : 'Aries';
    case 5:
      return day >= 21 ? 'Gemini' : 'Taurus';
    case 6:
      return day >= 21 ? 'Cancer' : 'Gemini';
    case 7:
      return day >= 23 ? 'Leo' : 'Cancer';
    case 8:
      return day >= 23 ? 'Virgo' : 'Leo';
    case 9:
      return day >= 23 ? 'Libra' : 'Virgo';
    case 10:
      return day >= 23 ? 'Scorpio' : 'Libra';
    case 11:
      return day >= 22 ? 'Sagittarius' : 'Scorpio';
    case 12:
      return day >= 22 ? 'Capricorn' : 'Sagittarius';
    default:
      return '';
  }
}

function getHoroscope(zodiacSign: string): string {
  const horoscopes = {
    Aquarius: 'You will have a day full of surprises. Embrace the unexpected.',
    Pisces: 'Today is a good day to focus on your creative pursuits.',
    Aries: 'Your energy and enthusiasm will help you achieve your goals.',
    Taurus: 'Take time to relax and enjoy the little things in life.',
    Gemini: 'Communication is key today. Reach out to old friends.',
    Cancer: 'Your intuition is strong today. Trust your instincts.',
    Leo: 'You will shine in social situations today. Be confident.',
    Virgo: 'Pay attention to the details. Your meticulous nature will pay off.',
    Libra: 'Balance is important today. Find time for work and play.',
    Scorpio: 'Passion will drive you today. Follow your heart.',
    Sagittarius: 'Adventure is calling. Take a chance and try something new.',
    Capricorn: 'Your hard work will be rewarded. Stay focused on your goals.',
  };

  return (
    horoscopes[zodiacSign] ||
    'Your future is unclear. Be prepared for anything.'
  );
}
