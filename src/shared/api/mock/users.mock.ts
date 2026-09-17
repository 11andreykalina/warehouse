import type { User } from '@/entities/user';

export const mockUser: User = {
    id: 'user-001',
    badgeNumber: '123456',

    identity: {
        firstName: 'Андрей',
        lastName: 'Калинин',
        middleName: 'Андреевич',
        birthDate: '1997-05-15',
    },

    service: {
        rank: 'старший летенант полиции',
        position: 'эксперт-криминалист',
        department: 'ОМВД России',
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