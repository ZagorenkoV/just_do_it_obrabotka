import { memo, ReactNode, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './block.module.scss';

interface BlockProps extends SVGProps<SVGSVGElement> {
    className?: string;
    children?: ReactNode;
}

export const Block = memo((props: BlockProps) => {
    const {
        className, children, ...otherProps
    } = props;

    return (
        <div className={classNames(classes.Block, {}, [className])}>
            {props.children}
        </div>
    );
});
