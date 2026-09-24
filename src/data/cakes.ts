export type Cake = {
  id: number
  name: string
  category: 'Birthday' | 'Anniversary' | 'Wedding' | 'Kids' | 'Designer' | 'Cheesecake' | 'Cupcake' | 'Brownie' | 'Tea Cake'
  price: number
  description: string
  details: string
  imageIndex: number
  imageCollection?: 'cakes' | 'bakes'
  badge?: string
}

export const cakes: Cake[] = [
  { id: 1, name: 'Midnight Truffle', category: 'Birthday', price: 599, imageIndex: 0, badge: 'Bestseller', description: 'Dark chocolate ganache with velvety cocoa layers.', details: 'An intensely chocolatey celebration cake layered with moist cocoa sponge and silky dark ganache, finished with handmade truffles.' },
  { id: 2, name: 'Scarlet Velvet', category: 'Anniversary', price: 699, imageIndex: 1, badge: 'Most Loved', description: 'Classic red velvet with smooth cream cheese frosting.', details: 'A tender crimson sponge with delicate cocoa notes, generously layered with our tangy vanilla cream cheese frosting.' },
  { id: 3, name: 'Caramel Crunch', category: 'Kids', price: 649, imageIndex: 2, description: 'Butterscotch cream, caramel and praline crunch.', details: 'Golden vanilla sponge, airy butterscotch mousse and salted caramel come together with a joyful praline crunch.' },
  { id: 4, name: 'Orchard Fresh', category: 'Wedding', price: 749, imageIndex: 3, description: 'Vanilla cloud cake crowned with seasonal fruits.', details: 'Feather-light vanilla sponge and fresh cream crowned with the best seasonal fruits for a bright, refreshing finish.' },
  { id: 5, name: 'Forest Noir', category: 'Anniversary', price: 599, imageIndex: 4, description: 'Chocolate sponge, cherry compote and fresh cream.', details: 'Our elegant take on Black Forest—deep cocoa sponge, tart cherry compote, whipped cream and fine chocolate shavings.' },
  { id: 6, name: 'Blush Garden', category: 'Designer', price: 999, imageIndex: 5, badge: 'Signature', description: 'Pastel floral cake, made to be remembered.', details: 'A show-stopping designer cake with delicate buttercream botanicals and your choice of vanilla, chocolate or red velvet sponge.' },
  { id: 7, name: 'Berry Baked Cheesecake', category: 'Cheesecake', price: 849, imageIndex: 0, imageCollection: 'bakes', badge: 'Just Launched', description: 'Creamy baked cheesecake finished with mixed berries.', details: 'A rich, smooth and completely eggless baked cheesecake set over a buttery biscuit base, crowned with glossy mixed berries for a bright finish.' },
  { id: 8, name: 'Celebration Cupcake Box', category: 'Cupcake', price: 449, imageIndex: 1, imageCollection: 'bakes', description: 'A joyful box of chocolate and vanilla cupcakes.', details: 'Soft eggless cupcakes in chocolate and vanilla, hand-piped with silky frosting and finished with delicate bakery decorations.' },
  { id: 9, name: 'Fudge Brownie Box', category: 'Brownie', price: 499, imageIndex: 2, imageCollection: 'bakes', badge: 'Brownie Bestseller', description: 'Deep chocolate brownies with a fudgy centre.', details: 'Decadent eggless chocolate brownies with a crackly top, rich cocoa flavour and an irresistibly soft, fudgy middle.' },
  { id: 10, name: 'Chocolate Tea Cake', category: 'Tea Cake', price: 399, imageIndex: 3, imageCollection: 'bakes', description: 'A tender chocolate loaf for everyday celebrations.', details: 'A comforting eggless chocolate loaf with a moist crumb and chocolate chips, perfect with tea, coffee or a quiet sweet moment.' },
]

export const sizeMultipliers: Record<string, number> = { '0.5 kg': 1, '1 kg': 1.75, '1.5 kg': 2.45, '2 kg': 3.1 }
