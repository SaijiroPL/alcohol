import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useToasts } from 'react-toast-notifications'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as Colors from 'const/colors'
import SingleButton from 'components/SingleButton'
import { codeRef } from 'firebase/instance'

interface props {
  code: string
  setCode: (code: string) => void
}

export default function({
  code,
  setCode
}: props) {
  const history = useHistory();
  const { addToast } = useToasts();

  const [checked, setChecked] = useState<boolean>(false);
  function onNext() {
    if (code.length < 6) {
      addToast('6文字以上入力してください。', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    if (checked)
      history.push('/question/1');
  }

  return (
    <div className='intro-container'>
      <div className='intro-upper font-fira'>
        <div className='intro-upper-text'>調査会社から指定されたコードを入力してください</div>
        <TextField
          InputProps={{ className: 'intro-code-text' }}
          inputProps={{ maxLength: 64 }}
          onChange={(e: any) => { setCode(e.target.value) }}
        />
      </div>
      <div className='intro-lower'>
        <div className="intro-lower-text">
          本調査の回答には5~10分かかります。回答時間が短すぎる場合には無効となる場合があります。
        </div>
        <div className="intro-lower-check-wrapper">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event, checked) => setChecked(checked)}
                color="primary"
              />
            }
            label="理解しました"
          />
        </div>
      </div>
      <SingleButton onClick={onNext} title='次　へ' color={Colors.GREEN} nonSticky={false} />
    </div>
  )
}