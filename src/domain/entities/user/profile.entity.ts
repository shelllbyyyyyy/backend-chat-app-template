export class Profile {
  constructor(
    private readonly id: string,
    private readonly displayName: string,
    private readonly gender: 'male' | 'female' | '',
    private readonly birthday: Date,
    private readonly horoscope: string,
    private readonly zodiac: string,
    private readonly height: number,
    private readonly weight: number,
  ) {
    this.id = id;
    this.displayName = displayName;
    this.gender = gender;
    this.birthday = birthday;
    this.horoscope = horoscope;
    this.zodiac = zodiac;
    this.height = height;
    this.weight = weight;
  }

  getId(): string {
    return this.id;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getGender(): string {
    return this.gender;
  }

  getBirthday(): Date {
    return this.birthday;
  }

  getHoroscope(): string {
    return this.horoscope;
  }

  getZodiac(): string {
    return this.zodiac;
  }

  getHeight(): number {
    return this.height;
  }

  getWeight(): number {
    return this.weight;
  }

  public static createProfile({
    id,
    displayName,
    gender,
    horoscope,
    zodiac,
    birthday,
    height,
    weight,
  }: {
    id: string;
    displayName: string;
    gender: '' | 'male' | 'female';
    birthday: Date;
    horoscope: string;
    zodiac: string;
    height: number;
    weight: number;
  }): Profile {
    return new Profile(
      id,
      displayName,
      gender,
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
    );
  }
}
