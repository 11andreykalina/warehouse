import {
  uniformGenderLabels,
  uniformServices,
  type UniformGender,
  type UniformService,
} from '@/shared/model';

export const registrationServices = uniformServices.filter(
  (service): service is Exclude<UniformService, 'general'> => service !== 'general',
);

export const registrationGenders = Object.entries(uniformGenderLabels)
  .filter(([gender]) => gender !== 'unisex') as [
    Exclude<UniformGender, 'unisex'>,
    string,
  ][];
