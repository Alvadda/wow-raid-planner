'use client'
import * as TooltipRadix from '@radix-ui/react-tooltip'

interface Props {
  content: React.ReactNode
  children: React.ReactNode
}

export const Tooltip = ({ children, content }: Props) => {
  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content className="bg-zinc-950 py-2 px-4 rounded" sideOffset={0}>
            {content}
            <TooltipRadix.Arrow className="TooltipArrow" />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
}
