'use client';

import useCanvasStore from '@/stores/useCanvasStore';
import {
	Eraser,
	LineSquiggle,
	Pencil,
	RedoIcon,
	RotateCcw,
	UndoIcon,
} from 'lucide-react';
import { Button } from './ui/button';

import { colorOptions } from '@/lib/constant';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import {
	ColorPicker,
	ColorPickerFormat,
	ColorPickerHue,
	ColorPickerOutput,
	ColorPickerSelection,
} from './ui/shadcn-io/color-picker';
import { Slider } from './ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
export default function Toolbar() {
	const {
		currentColor,
		brushSize,
		drawingActions,
		activeTool,
		setActiveTool,
		changeColor,
		changeWidth,
		undoDrawing,
		clearDrawing,
		redoDrawing,
	} = useCanvasStore();

	return (
		<div className='border p-2 bg-white rounded-lg flex gap-2'>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size={'icon'}
						variant={activeTool === 'pencil' ? 'default' : 'outline'}
						onClick={() => setActiveTool('pencil')}>
						<Pencil />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					Pen <kbd>P</kbd>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size={'icon'}
						variant={activeTool === 'eraser' ? 'default' : 'outline'}
						onClick={() => setActiveTool('eraser')}>
						<Eraser />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					Eraser <kbd>E</kbd>
				</TooltipContent>
			</Tooltip>

			<div>
				<Separator orientation='vertical' />
			</div>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>
						<LineSquiggle />
						<span>{brushSize}px</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-56'>
					<Slider
						min={1}
						max={30}
						value={[brushSize]}
						onValueChange={(val) => changeWidth(val[0])}
					/>
				</PopoverContent>
			</Popover>

			<div>
				<Separator orientation='vertical' />
			</div>

			<div className='flex items-center space-x-4 mx-2'>
				{colorOptions.map((color) => (
					<button
						key={color}
						onClick={() => changeColor(color)}
						className={`size-4 rounded-full border-2 transition-all duration-150 ${
							currentColor === color
								? `ring-1 ring-offset-2`
								: 'hover:scale-110'
						}`}
						style={{ backgroundColor: color, borderColor: color }}
						title={`Set color to ${color}`}
					/>
				))}

				<Popover>
					<PopoverTrigger asChild>
						<Image
							alt='rainbow'
							src='/rainbow.jpg'
							className='size-4 cursor-pointer hover:scale-110 transition-all'
							width={24}
							height={24}
						/>
					</PopoverTrigger>
					<PopoverContent className='p-0'>
						<ColorPicker className='max-w-sm rounded-md border bg-background p-4 shadow-sm h-84 w-full'>
							<ColorPickerSelection />
							<div className='flex items-center gap-4'>
								<div className='grid w-full gap-1'>
									<ColorPickerHue />
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<ColorPickerOutput />
								<ColorPickerFormat />
							</div>
						</ColorPicker>
					</PopoverContent>
				</Popover>
			</div>

			<div>
				<Separator orientation='vertical' />
			</div>

			<Button
				size={'icon'}
				variant={'outline'}
				onClick={undoDrawing}
				disabled={drawingActions.length === 0}>
				<UndoIcon />
			</Button>
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={redoDrawing}
				disabled={drawingActions.length === 0}>
				<RedoIcon />
			</Button>
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={clearDrawing}
				disabled={drawingActions.length === 0}>
				<RotateCcw />
			</Button>
		</div>
	);
}
