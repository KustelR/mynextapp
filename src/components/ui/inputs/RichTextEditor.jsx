import React, {useEffect, useState} from 'react'

import {$getRoot, $getSelection, $isRangeSelection} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import {$setBlocksType} from '@lexical/selection'
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode, ListItemNode} from '@lexical/list'
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {$generateHtmlFromNodes} from '@lexical/html';


const theme = {
  heading: {
    h3: 'font-bold text-2xl',
    h4: 'font-bold text-xl',
    h5: 'font-semibold text-lg',
    h6: 'font-semibold'
  }
}

function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        onChange($generateHtmlFromNodes(editor, null));
      })
    });
  }, [editor, onChange]);

}

function HeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  function onClick(tag) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag))
      }
    })
  }
  return (
    <div>
      <ul className='flex'>
        {['h3', 'h4', 'h5', 'h6'].map(tag => {return (
          <li key={tag}>
            <button className='mr-2 p-1 hover:shadow-inner dark:hover:bg-neutral-700 border-2 border-neutral-50 dark:border-transparent' type="button" onClick={() => {onClick(tag)}}>{tag.toUpperCase()}</button>
          </li>
        )})}
      </ul>
    </div>
  )
}


function ListToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  function onClick(tag) {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }
  return (
    <div>
      <ul className='flex'>
        {["ol", 'ul'].map(tag => {return (
          <li key={tag}>
            <button className='mr-2 p-1 hover:shadow-inner dark:hover:bg-neutral-700 border-2 border-neutral-50 dark:border-transparent' type="button" onClick={() => {onClick(tag)}}>{tag.toUpperCase()}</button>
          </li>
        )})}
      </ul>
    </div>
  )
}



function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      <div>Styling</div>
    <div className='flex mb-1 border-y-2 border-neutral-200 dark:border-neutral-600'>
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
      <ListPlugin/>
    </div>
    </div>
  )
}


function onError(error) {
  console.error(error);
}


export default function RichTextEditor({onChange, className, label}) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode
    ],
    onError,
  };

  return (
    <div className='relative'>
    <div className='font-bold'>{label}</div>
      <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin/>
      <RichTextPlugin
        contentEditable={<ContentEditable className={"prose max-w-none dark:prose-invert w-full outline-0 bg-gray-100 dark:bg-neutral-800 focus:bg-transparent dark:focus:bg-transparent align-top min-h-200px border-b-2 border-neutral-200 focus:border-neutral-400 transition-all duration-400 " + className} />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
    </div>
    
  );
}
