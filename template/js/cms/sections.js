import getSections from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections'
const bannerFields = [
    {
      label: 'Imagem',
      name: 'img',
      widget: 'image'
    },
    {
      label: 'Link',
      required: false,
      name: 'link',
      widget: 'string'
    },
    {
      label: 'Alt',
      required: false,
      name: 'alt',
      widget: 'string'
    },
    {
      label: 'Imagem para mobile',
      required: false,
      name: 'mobile_img',
      widget: 'image'
    },
    {
      name: 'width',
      required: false,
      widget: 'hidden'
    },
    {
      name: 'height',
      required: false,
      widget: 'hidden'
    }
]
const searchOrderField = {
    label: 'Ordenação',
    required: false,
    name: 'sort',
    widget: 'select',
    options: [
      {
        label: 'Relevância',
        value: 'views'
      },
      {
        label: 'Mais vendidos',
        value: 'sales'
      },
      {
        label: 'Lançamento',
        value: 'news'
      },
      {
        label: 'Ofertas',
        value: 'offers'
      },
      {
        label: 'Menor preço',
        value: 'lowest_price'
      },
      {
        label: 'Maior preço',
        value: 'highest_price'
      },
      {
        label: 'Alfabética (slug)',
        value: 'slug'
      }
    ]
}
export default ({ state }) => {
  const sections = getSections({ state })
  sections.push({
    label: "Banner com Coleção",
    name: "banner-with-collection",
    widget: "object",
    icon: "https://api.iconify.design/bi:grid.svg",
    fields: [
        {
            label: 'Banners',
            name: 'banners',
            widget: 'list',
            fields: bannerFields
        },
        {
            label: 'Coleção de produtos',
            required: false,
            name: 'collection_id',
            hint: 'Se este campo não for preenchido, serão listados os produtos mais populares da loja',
            widget: 'select',
            options: [{
              resource: 'collections',
              label: ''
            }, {
              resource: 'categories',
              label: 'Categoria: '
            }, {
              resource: 'brands',
              label: 'Marca: '
            }].reduce((options, shelf) => {
              state.routes.forEach(({ _id, resource, name, path }) => {
                if (resource === shelf.resource) {
                  options.push({
                    label: shelf.label + name,
                    value: `${_id}:${resource}:${name}:${path}`
                  })
                }
              })
              return options
            }, [])
          },
          searchOrderField,
          {
            label: 'Embaralhar produtos',
            name: 'shuffle',
            widget: 'boolean',
            default: false
          },
          {
            label: 'Título da estante',
            required: false,
            name: 'title',
            hint: 'Usará o nome da coleção por padrão',
            widget: 'string'
          },
          {
            label: 'Link no título',
            required: false,
            name: 'link',
            hint: 'Usará o slug da coleção por padrão',
            widget: 'string'
          },
          {
            label: 'Sem cabeçalho',
            required: false,
            name: 'headless',
            widget: 'boolean',
            hint: 'Mostrar apenas a lista de produtos, sem título ou link'
          },
          {
            label: 'Limite de itens',
            required: false,
            name: 'limit',
            widget: 'number',
            min: 1,
            max: 24,
            default: 12
          },
          {
            label: 'Paginação',
            required: false,
            name: 'page',
            hint: 'Aumente o número da página para pular os itens iniciais e repetir estantes com a mesma coleção',
            widget: 'number',
            min: 1,
            default: 1
          },
          {
            label: 'Carousel autoplay',
            required: false,
            name: 'autoplay',
            hint: 'Exibição de cada página em milisegundos, 0 desativa o autoplay',
            min: 0,
            step: 1000,
            widget: 'number'
          }
    ]
}, {
    label: 'Carrossel de Categorias',
    name: 'categories-carousel',
    widget: 'object',
    icon: 'https://api.iconify.design/mdi:copyright.svg',
    fields: [
        {
            label: 'Selecione categorias',
            required: true,
            name: 'category_ids',
            widget: 'select',
            multiple: true,
            options: [{
              resource: 'categories',
              label: 'Categoria: '
            }].reduce((options, shelf) => {
              state.routes.forEach(({ _id, resource, name, path }) => {
                if (resource === shelf.resource) {
                  options.push({
                    label: shelf.label + name,
                    value: `${_id}`
                  })
                }
              })
              return options
            }, [])
          },
      {
        label: 'Carousel autoplay',
        required: false,
        name: 'autoplay',
        hint: 'Exibição de cada página em milisegundos, 0 desativa o autoplay',
        min: 0,
        step: 1000,
        widget: 'number'
      },
      {
        name: 'title',
        widget: 'string',
        required: false,
        label: 'Nome do carousel de categorias'
      }
    ]
})
  return sections
}
