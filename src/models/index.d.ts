import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nom: string;
  readonly Type: string;
  readonly Description?: string | null;
  readonly Localisation: string;
  readonly Etat: string;
  readonly Image_URL: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nom: string;
  readonly Type: string;
  readonly Description?: string | null;
  readonly Localisation: string;
  readonly Etat: string;
  readonly Image_URL: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plant = LazyLoading extends LazyLoadingDisabled ? EagerPlant : LazyPlant

export declare const Plant: (new (init: ModelInit<Plant>) => Plant) & {
  copyOf(source: Plant, mutator: (draft: MutableModel<Plant>) => MutableModel<Plant> | void): Plant;
}