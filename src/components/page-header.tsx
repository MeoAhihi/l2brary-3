import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function PageHeader({ pageTitle, descriptions, children }: { pageTitle: string, descriptions: string[], children?: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-sm text-gray-500">
            {descriptions.map((description) => (
              <Badge key={description} variant="secondary" className="mr-1">
                {description}
              </Badge>
            ))}
          </p>
        </div>
        <div className='flex gap-2'>
          {children}
        </div>
      </div>
      <Separator className="my-4" />
    </>
  )
}