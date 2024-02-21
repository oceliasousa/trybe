export type CategoryType = {
  id: string;
  name: string;
};

export type CategoryListProps = {
  categories: CategoryType[];
  handleCategoryChange: () => void;
};

export type CartItemsProps = {
  updateCartCount: () => void;
};

export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity?: number;
  shipping: {
    free_shipping: boolean;
  };
};

export type HomeProps = {
  handleAddInCart: (product: ProductType) => void;
  cartCount: number;
};

export type ProductListProps = {
  productList: ProductType[];
  handleAddInCart: (product: ProductType) => void;
};

export type CheckoutFormType = {
  fullname: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  payment: string;
};

export type CheckoutProps = {
  updateCartCount: () => void;
};

export type ProductProps = {
  handleAddInCart: (product: ProductType) => void;
  cartCount: number;
};

export type ReviewType = {
  email: string;
  rating: number;
  review: string;
};

export type SideCartProps = {
  updateCartCount: () => void;
  showCart: boolean;
  toggleCart: (show: boolean) => void;
};

export type HeaderProps = {
  cartCount: number;
  updateCartCount: () => void;
};
