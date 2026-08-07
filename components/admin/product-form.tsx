'use client'

import { productDefaultValues } from '@/lib/constants'
import { insertProductSchema, updateProductSchema } from '@/lib/validators'
import { Product } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import slugify from 'slugify'
import { toast } from 'sonner'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { UploadButton } from '@/lib/uploadthing'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: Product
  productId?: string
}) => {
  const router = useRouter()

  const items = [
    {
      id: 'crime',
      label: 'Crime',
    },
    {
      id: 'mystery',
      label: 'Mystery',
    },
    {
      id: 'thriller',
      label: 'Thriller',
    },
    {
      id: 'romance',
      label: 'Romance',
    },
    {
      id: 'drama',
      label: 'Drama',
    },
    {
      id: 'fiction',
      label: 'Fiction',
    },
    {
      id: 'fantasy',
      label: 'Fantasy',
    },
    {
      id: 'adventure',
      label: 'Adventure',
    },
  ]

  const ages = [
    {
      id: 'children',
      label: 'Children',
    },
    {
      id: 'teenagers',
      label: 'Teenagers',
    },
    {
      id: 'adults',
      label: 'Adults',
    },
  ]

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(
      type === 'Create' ? insertProductSchema : updateProductSchema,
    ),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values,
  ) => {
    // On Create
    if (type === 'Create') {
      const res = await createProduct(values)

      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        router.push('/admin/products')
      }
    }

    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products')
        return
      }

      const res = await updateProduct({ ...values, id: productId })

      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        router.push('/admin/products')
      }
    }
  }

  const images = form.watch('images')
  const isFeatured = form.watch('isFeatured')
  const banner = form.watch('banner')

  function removeImage(imageUrl: string) {
    form.setValue(
      'images',
      images.filter((img) => img !== imageUrl),
    )
  }

  function removeBannerImage() {
    form.setValue('banner', '')
  }

  return (
    <Form {...form}>
      <form
        method='POST'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 text-gray-600'
      >
        <div className='flex flex-col md:flex-row gap-5'>
          <div className='min-w-[300px] lg:w-full'>
            {/* Title */}
            <FormField
              control={form.control}
              name='title'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'title'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter product title'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Author */}
            <FormField
              control={form.control}
              name='author'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'author'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter product author'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'slug'
              >
            }) => (
              <FormItem className='w-full gap-0'>
                <FormLabel className='mb-2 md:-mb-1'>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Enter slug'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                    <Button
                      type='button'
                      className='px-4 py-1 mt-2 cursor-pointer'
                      variant='navyDull'
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('title'), {
                            lower: true,
                          }),
                        )
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            <div className='grid gap-2 w-full mt-4'>
              {/* Genre */}
              <FormField
                control={form.control}
                name='genre'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof insertProductSchema>,
                    'genre'
                  >
                }) => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='mb-2'>Genre</FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className='w-full rounded border-2 border-solid border-slate-200 focus-visible:ring-primary-purple/70 text-gray-500 cursor-pointer'>
                            <SelectValue placeholder='Select a genre' />
                          </SelectTrigger>
                          <SelectContent className='border-gray-200 bg-white text-gray-500'>
                            <SelectGroup>
                              {items.map((item) => (
                                <SelectItem
                                  value={item.id}
                                  key={item.id}
                                  className='cursor-pointer'
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage className='mt-2' />
                  </FormItem>
                )}
              />
            </div>
            {/* Age */}
            <div className='grid gap-2 w-full mt-4'>
              <FormField
                control={form.control}
                name='age'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof insertProductSchema>,
                    'age'
                  >
                }) => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='mb-2'>Age</FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className='w-full rounded border-2 border-solid border-slate-200 focus-visible:ring-primary-purple/70 text-gray-500 cursor-pointer'>
                            <SelectValue placeholder='Select age' />
                          </SelectTrigger>
                          <SelectContent className='border-gray-200 bg-white text-gray-500'>
                            <SelectGroup>
                              {ages.map((item) => (
                                <SelectItem
                                  value={item.id}
                                  key={item.id}
                                  className='cursor-pointer'
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage className='mt-2' />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-5'>
          <div className='w-full'>
            {/* Plot */}
            <FormField
              control={form.control}
              name='plot'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'plot'
                >
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Plot</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter product plot'
                      className='resize-none rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='w-full'></div>
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            {/* Pages */}
            <FormField
              control={form.control}
              name='pages'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'pages'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Pages</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='387'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Publication Date */}
            <FormField
              control={form.control}
              name='publicationDate'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'publicationDate'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Publication Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='23/02/2022'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            {/* Language */}
            <FormField
              control={form.control}
              name='language'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'language'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='english'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Binding */}
            <FormField
              control={form.control}
              name='binding'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProductSchema>,
                  'binding'
                >
              }) => (
                <FormItem className='w-full mt-4'>
                  <FormLabel>Biding</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Paperback'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className='flex flex-col md:flex-row gap-5'>
          {/* Price */}
          <FormField
            control={form.control}
            name='price'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'price'
              >
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter product price'
                    {...field}
                    className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name='stock'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'stock'
              >
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter stock'
                    {...field}
                    className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field flex flex-col md:flex-row gap-5'>
          {/* Images */}
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <div key={image} className='relative'>
                          <Image
                            src={image}
                            alt='product image'
                            className='w-20 h-30 object-cover object-center rounded-sm'
                            width={100}
                            height={100}
                          />
                          <button
                            type='button'
                            onClick={() => removeImage(image)}
                            className='absolute -right-1.5 -top-1.5 rounded-full border border-gray-800 bg-gray-700 px-1.5 py-0.5 text-[10px] font-semibold text-gray-100 hover:bg-gray-900 cursor-pointer'
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`)
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'>
          {/* isFeatured */}
          <p className='text-gray-600 font-medium text-sm pb-2'>
            Featured Product
          </p>
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='cursor-pointer h-5 w-5'
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <div className='relative'>
                  <Image
                    src={banner}
                    alt='banner image'
                    className='w-full object-cover object-center rounded-sm'
                    width={1920}
                    height={680}
                  />
                  <button
                    type='button'
                    onClick={() => removeBannerImage()}
                    className='absolute -right-1.5 -top-1.5 rounded-full border border-gray-800 bg-gray-700 px-3 py-1.5 text-[14px] font-semibold text-gray-100 hover:bg-gray-900 cursor-pointer'
                  >
                    ×
                  </button>
                </div>
              )}

              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`)
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            variant='purple'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full cursor-pointer'
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
