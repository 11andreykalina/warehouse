import {
  uniformGenderLabels,
  uniformServices,
  uniformServiceLabels,
  type UniformGender,
  type UniformService,
} from '@/shared/model';

export const profileServiceOptions = uniformServices
  .filter((service): service is Exclude<UniformService, 'general'> => service !== 'general')
  .map((service) => [service, uniformServiceLabels[service]] as const);

export const profileGenderOptions = Object.entries(uniformGenderLabels)
  .filter(([gender]) => gender !== 'unisex') as [
    Exclude<UniformGender, 'unisex'>,
    string,
  ][];
