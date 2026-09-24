import { useSearchParams } from 'react-router-dom'
import { CakeCard } from '../components/CakeCard'
import { cakes } from '../data/cakes'

const categories = ['All', 'Birthday', 'Anniversary', 'Wedding', 'Kids', 'Designer', 'Cheesecake', 'Cupcake', 'Brownie', 'Tea Cake']

export function Cakes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const category = requestedCategory && categories.includes(requestedCategory) ? requestedCategory : 'All'
  const filtered = category === 'All' ? cakes : cakes.filter((cake) => cake.category === category)
  return <main className='min-h-screen bg-cream'><section className='border-b border-[#eadfd8] bg-blush/50 py-9 text-center sm:py-11'><div className='page-shell'><p className='eyebrow justify-center'>Handcrafted happiness</p><h1 className='mt-2 font-display text-4xl font-semibold text-cocoa sm:text-5xl'>Find your celebration cake</h1><p className='mx-auto mt-3 max-w-2xl text-sm text-stone-600 sm:text-base'>From timeless favourites to statement designs, each cake is baked fresh for your special day.</p></div></section>
  <section className='page-shell py-8 sm:py-11'><div className='mb-7 flex gap-2 overflow-x-auto pb-2'>{categories.map((item) => <button key={item} onClick={() => setSearchParams(item === 'All' ? {} : { category: item })} className={'whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ' + (category === item ? 'bg-berry text-white shadow' : 'border border-[#dfd0c8] bg-white text-stone-600 hover:border-berry hover:text-berry')}>{item}</button>)}</div>
  <div className='mb-6 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between'><h2 className='font-display text-3xl font-semibold text-cocoa'>{category} cakes</h2><span className='text-sm text-stone-500'>{filtered.length} delicious choices</span></div>
  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>{filtered.map((cake) => <CakeCard key={cake.id} cake={cake} />)}</div></section></main>
}
