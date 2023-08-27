import { memo, SVGProps, VFC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, ...otherProps
    } = props;

    return (
        <Svg
            className={classNames(classes.Icon, {}, [className])}
            {...otherProps}
        />
    );
});
