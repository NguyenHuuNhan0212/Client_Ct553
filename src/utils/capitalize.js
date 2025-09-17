export function capitalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .filter(Boolean) // bỏ bớt khoảng trắng thừa
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
