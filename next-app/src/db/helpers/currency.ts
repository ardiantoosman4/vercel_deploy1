export function rupiahFormat(value:number):string {
  return value.toLocaleString('id-ID', {currency: 'IDR', style: 'currency'});
}