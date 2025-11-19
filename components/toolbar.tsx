'use client';

import useCanvasStore from '@/lib/stores/useCanvasStore';
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
	} = useCanvasStore();

	console.log(brushSize, currentColor);

	return (
		<div className='border p-2 bg-white rounded-lg flex gap-2'>
			<Button
				size={'icon'}
				variant={activeTool === 'pencil' ? 'secondary' : 'outline'}
				onClick={() => setActiveTool('pencil')}>
				<Pencil />
			</Button>
			<Button
				size={'icon'}
				variant={activeTool === 'eraser' ? 'secondary' : 'outline'}
				onClick={() => setActiveTool('eraser')}>
				<Eraser />
			</Button>

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
				variant={'outline'}>
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

// <div className='flex flex-wrap gap-4 p-4 bg-indigo-500 shadow-lg rounded-xl mb-6 border border-gray-200'>
// 	{/* Color Chooser */}
// 	<div className='flex items-center space-x-2'>
// 		<span className='text-gray-600 font-medium'>Color:</span>
// 		{colorOptions.map((color) => (
// 			<button
// 				key={color}
// 				onClick={() => changeColor(color)}
// 				className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
// 					currentColor === color
// 						? 'ring-4 ring-offset-2 ring-gray-400'
// 						: 'hover:scale-110'
// 				}`}
// 				style={{ backgroundColor: color, borderColor: color }}
// 				title={`Set color to ${color}`}
// 			/>
// 		))}
// 	</div>

// 	{/* Brush Size Slider */}
// 	<div className='flex items-center space-x-3'>
// 		<label
// 			htmlFor='brushSize'
// 			className='text-gray-600 font-medium whitespace-nowrap'>
// 			Size ({brushSize}px):
// 		</label>
// 		<input
// 			id='brushSize'
// 			type='range'
// 			min='1'
// 			max='30'
// 			value={brushSize}
// 			onChange={(e) => changeWidth(Number(e.target.value))}
// 			className='w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg'
// 		/>
// 	</div>

// 	{/* Action Buttons */}
// 	<button
// 		onClick={undoDrawing}
// 		disabled={drawingActions.length === 0}
// 		className='px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150'>
// 		Undo ({drawingActions.length})
// 	</button>
// 	<button
// 		onClick={clearDrawing}
// 		disabled={drawingActions.length === 0}
// 		className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150'>
// 		Clear All
// 	</button>
// </div>
