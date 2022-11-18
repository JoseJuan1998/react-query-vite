import { useMutation, useQuery, useQueryClient } from "react-query";
import { IHero } from "../interfaces/IHero";
import { addSuperHero, getSuperHero, getSuperHeros } from "../services/api";

export function useSuperHeroesData() {
  return useQuery("super-heroes", getSuperHeros, {
    onSuccess: (data) => console.log({ data }),
    onError: (error) => console.log({ error }),
    select: (data): any => {
      const superheroes: IHero[] = data?.data || [];
      return superheroes as IHero[];
    },
  });
}

export function useSuperHeroData(id: number) {
  const queryClient = useQueryClient();
  return useQuery(["super-heroe", id], () => getSuperHero(id), {
    onSuccess: (data) => console.log({ data }),
    onError: (error) => console.log({ error }),
    select: (data): any => {
      const superhero: IHero = data?.data || {};
      return superhero;
    },
    staleTime: 5000,
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero: IHero) => hero.id === id);
      if (hero)
        return {
          data: hero,
        };
      return undefined;
    },
  });
}

export function useAddSuperHeroData(hero: IHero) {
  const queryClient = useQueryClient();
  return useMutation(() => addSuperHero(hero), {
    // onSuccess: (data) => {
    //   console.log(data.data);
    //   // return queryClient.invalidateQueries("super-heroes")
    //   return queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData?.data, data.data]
    //     }
    //   })
    // },
    onMutate: async (newHero: IHero) => {
      await queryClient.cancelQueries("super-heroes");

      const previousData = queryClient.getQueryData("super-heroes");

      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData?.data, {
            id: oldQueryData?.data?.length + 1,
            ...newHero
          }],
        };
      });

      return previousData
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes")
    },
  });
}
