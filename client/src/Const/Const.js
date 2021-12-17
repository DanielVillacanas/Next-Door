export const navigation = [
  { name: "Inicio", href: "/", current: false },
  { name: "Productos", href: "/products", current: false },
];

export const notLogged = [
  { name: "Inicio de Sesión", href: "/login", current: false },
  { name: "Registrarse", href: "/signUp", current: false },
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
    name: "Categoría de Tienda",
    options: [
      { value: "Carnes", label: "Carnicería", checked: false },
      { value: "Pescados", label: "Pescadería", checked: false },
      { value: "Frutas", label: "Frutería", checked: false },
      { value: "Verduras", label: "Verdulería", checked: false },
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
