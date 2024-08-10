import { Profile } from '@/domain/entities/user/profile.entity';
import { Gender, ProfileDocument } from './profile.model';

export class ProfileMapper {
  static toDomain(data: ProfileDocument): Profile {
    return new Profile(
      data._id as string,
      data.displayName,
      Gender[data.gender],
      data.birthday,
      data.horoscope,
      data.zodiac,
      data.height,
      data.weight,
    );
  }

  static toMongoose(data: Profile): ProfileDocument {
    return {
      displayName: data.getDisplayName(),
      gender: data.getGender(),
      birthday: new Date(data.getBirthday()),
      horoscope: data.getHoroscope(),
      zodiac: data.getZodiac(),
      height: data.getHeight(),
      weight: data.getWeight(),
    } as ProfileDocument;
  }
}
