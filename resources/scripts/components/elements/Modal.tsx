import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { CSSTransition } from 'react-transition-group';

interface Props {
    visible: boolean;
    onDismissed: () => void;
    dismissable?: boolean;
    closeOnEscape?: boolean;
    closeOnBackground?: boolean;
    children: React.ReactChild;
}

export default (props: Props) => {
    const [render, setRender] = useState(props.visible);

    const handleEscapeEvent = (e: KeyboardEvent) => {
        if (props.dismissable !== false && props.closeOnEscape !== false && e.key === 'Escape') {
            setRender(false);
        }
    };

    useEffect(() => setRender(props.visible), [props.visible]);

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeEvent);

        return () => window.removeEventListener('keydown', handleEscapeEvent);
    }, [render]);

    return (
        <CSSTransition
            timeout={250}
            classNames={'fade'}
            in={render}
            unmountOnExit={true}
            onExited={() => props.onDismissed()}
        >
            <div className={'modal-mask'} onClick={e => {
                if (props.dismissable !== false && props.closeOnBackground !== false) {
                    e.stopPropagation();
                    if (e.target === e.currentTarget) {
                        setRender(false);
                    }
                }
            }}>
                <div className={'modal-container top'}>
                    {props.dismissable !== false &&
                    <div className={'modal-close-icon'} onClick={() => setRender(false)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    }
                    <div className={'modal-content p-6'}>
                        {props.children}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};
