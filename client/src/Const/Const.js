export const navigation = [
  { name: "Home Page", href: "/", current: false },
  { name: "All products", href: "/products", current: false },
];

export const notLogged = [
  { name: "Login", href: "/login", current: false },
  { name: "Sign Up", href: "/signUp", current: false },
];

export const Options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const sortOptions = [
  { value: "1", label: "Más caro", checked: false },
  { value: "0", label: "Más barato", checked: false },
];

export const filters = [
  {
    id: "categorias",
    name: "Categoría de Productos",
    options: [
      { value: "Carnes", label: "Carnes", checked: false },
      { value: "Pescados", label: "Pescados", checked: false },
      { value: "Frutas", label: "Frutas", checked: false },
      { value: "Verduras", label: "Verduras", checked: false },
      { value: "Other", label: "Otros", checked: false },
    ],
  },
];

export const range = [
  {
    id: "categorias",
    name: "Distancia",
    options: [
      { value: "0", label: "Ninguna", checked: false },
      { value: "5", label: "5km", checked: false },
      { value: "10", label: "10km", checked: false },
      { value: "15", label: "15km", checked: false },
      { value: "20", label: "20km", checked: false },
      { value: "25", label: "25km", checked: false },
    ],
  },
];