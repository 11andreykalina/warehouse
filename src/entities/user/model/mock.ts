import type { User } from './types';

export const mockUser: User = {
  id: 'user-001',
  badgeNumber: '123456',
  phone: '+7 (863) 000-00-00',
  email: 'andrey.kalinin@rosleshoz.mvd',
  identity: {
    firstName: 'Андрей',
    lastName: 'Калинин',
    middleName: 'Андреевич',
    birthDate: '1997-05-15',
  },
  service: {
    rank: 'старший лейтенант полиции',
    position: 'эксперт-криминалист',
    department: 'ОМВД России по г. Шахты',
    locationName: 'Отдел МВД России по Константиновскому району',
    uniformService: 'investigation',
    rankGroup: 'senior-middle',
    uniformDuties: [],
    uniformConditions: [],
    serviceStartDate: '2021-09-01',
  },
  measurements: {
    gender: 'male',
    height: 178,
    weight: 78,
    clothingSize: '50-4',
    shoeSize: '41',
    headSize: '56',
  },
};
