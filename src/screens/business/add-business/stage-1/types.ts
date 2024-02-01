export interface Category {
    name: string;
    subCategories: {
      defaultTime: { hours: number; minutes: number };
      price: number;
      name: string;
    };
  }
  